import express from 'express';
import { selfTestService, SelfTestAssessment, PersonalInfo } from '../services/selfTestService';

const router = express.Router();

// 提交自我测试评估并获取AI分析
router.post('/analyze', async (req, res) => {
  try {
    console.log('收到自我测试分析请求');
    
    // 验证请求数据
    const assessment: SelfTestAssessment = req.body;
    
    if (!assessment || !assessment.scores || !assessment.totalScore) {
      return res.status(400).json({
        code: 400,
        message: '请求数据格式错误',
        data: null
      });
    }

    // 验证分数范围
    if (assessment.totalScore < 0 || assessment.totalScore > 200) {
      return res.status(400).json({
        code: 400,
        message: '总分数据异常',
        data: null
      });
    }

    // 验证各维度分数
    const { dimensionScores } = assessment;
    if (!dimensionScores || 
        dimensionScores.trust < 0 || dimensionScores.trust > 50 ||
        dimensionScores.connect < 0 || dimensionScores.connect > 50 ||
        dimensionScores.enable < 0 || dimensionScores.enable > 50 ||
        dimensionScores.develop < 0 || dimensionScores.develop > 50) {
      return res.status(400).json({
        code: 400,
        message: '维度分数数据异常',
        data: null
      });
    }

    console.log('开始AI分析，评估数据:', {
      totalScore: assessment.totalScore,
      dimensionScores: assessment.dimensionScores
    });

    // 调用AI分析服务
    const analysisResult = await selfTestService.analyzeAssessment(assessment);

    console.log('AI分析完成');

    // 保存匿名评估结果到管理员统计
    try {
      const linkId = req.body.linkId || null; // 从请求中获取linkId
      
      console.log('=== 后端接收评估数据 ===');
      console.log('请求体中的linkId:', req.body.linkId);
      console.log('linkId类型:', typeof req.body.linkId);
      console.log('最终使用的linkId:', linkId);
      console.log('完整请求体:', {
        linkId: req.body.linkId,
        totalScore: req.body.totalScore,
        hasScores: !!req.body.scores,
        hasDimensionScores: !!req.body.dimensionScores
      });
      
      const saveData = {
        linkId,
        scores: assessment.scores,
        totalScore: assessment.totalScore,
        dimensionScores: assessment.dimensionScores,
        analysis: analysisResult.analysis
      };
      
      console.log('准备保存的数据:', saveData);
      
      // 调用管理员API保存结果
      const saveResponse = await fetch(`http://localhost:3000/api/admin/assessment-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saveData)
      });
      
      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        console.error('保存评估结果API响应错误:', saveResponse.status, errorText);
      } else {
        const saveResult = await saveResponse.json();
        console.log('评估结果已保存到统计系统:', saveResult);
      }
    } catch (error) {
      console.error('保存评估结果失败:', error);
      // 不影响用户体验，继续返回结果
    }

    // 返回分析结果
    return res.json({
      code: 200,
      message: '分析完成',
      data: {
        analysis: analysisResult.analysis,
        recommendations: analysisResult.recommendations,
        strengths: analysisResult.strengths,
        improvements: analysisResult.improvements,
        assessmentData: {
          totalScore: assessment.totalScore,
          dimensionScores: assessment.dimensionScores,
          subDimensionScores: assessment.subDimensionScores,
          timestamp: new Date().toISOString()
        }
      }
    });

  } catch (error: any) {
    console.error('自我测试分析错误:', error);
    
    return res.status(500).json({
      code: 500,
      message: error.message || '分析服务暂时不可用，请稍后重试',
      data: null
    });
  }
});

// 提交个性化自我测试评估并获取AI分析
router.post('/analyze-personalized', async (req, res) => {
  try {
    console.log('收到个性化自我测试分析请求');
    
    // 验证请求数据
    const { assessment, personalInfo }: { assessment: SelfTestAssessment, personalInfo: PersonalInfo } = req.body;
    
    if (!assessment || !assessment.scores || !assessment.totalScore) {
      return res.status(400).json({
        code: 400,
        message: '评估数据格式错误',
        data: null
      });
    }

    // 验证分数范围
    if (assessment.totalScore < 0 || assessment.totalScore > 200) {
      return res.status(400).json({
        code: 400,
        message: '总分数据异常',
        data: null
      });
    }

    // 验证各维度分数
    const { dimensionScores } = assessment;
    if (!dimensionScores ||
        dimensionScores.trust < 0 || dimensionScores.trust > 50 ||
        dimensionScores.connect < 0 || dimensionScores.connect > 50 ||
        dimensionScores.enable < 0 || dimensionScores.enable > 50 ||
        dimensionScores.develop < 0 || dimensionScores.develop > 50) {
      return res.status(400).json({
        code: 400,
        message: '维度分数数据异常',
        data: null
      });
    }

    console.log('开始个性化AI分析，评估数据:', {
      totalScore: assessment.totalScore,
      dimensionScores: assessment.dimensionScores,
      personalInfo: personalInfo
    });

    // 调用AI分析服务（包含个人信息）
    const analysisResult = await selfTestService.analyzeAssessment(assessment, personalInfo);

    console.log('个性化AI分析完成');

    // 保存匿名评估结果到管理员统计
    try {
      const linkId = req.body.linkId || null;
      
      await fetch(`http://localhost:3000/api/admin/assessment-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          linkId,
          scores: assessment.scores,
          totalScore: assessment.totalScore,
          dimensionScores: assessment.dimensionScores,
          analysis: analysisResult.analysis,
          personalInfo: personalInfo // 可选：保存个人信息用于统计分析
        })
      });
      
      console.log('个性化评估结果已保存到统计系统');
    } catch (error) {
      console.error('保存个性化评估结果失败:', error);
      // 不影响用户体验，继续返回结果
    }

    // 返回个性化分析结果
    return res.json({
      code: 200,
      message: '个性化分析完成',
      data: {
        analysis: analysisResult.analysis,
        recommendations: analysisResult.recommendations,
        strengths: analysisResult.strengths,
        improvements: analysisResult.improvements,
        assessmentData: {
          totalScore: assessment.totalScore,
          dimensionScores: assessment.dimensionScores,
          subDimensionScores: assessment.subDimensionScores,
          personalInfo: personalInfo,
          timestamp: new Date().toISOString()
        }
      }
    });

  } catch (error: any) {
    console.error('个性化自我测试分析错误:', error);
    
    return res.status(500).json({
      code: 500,
      message: error.message || '个性化分析服务暂时不可用，请稍后重试',
      data: null
    });
  }
});

// 获取自我测试问题列表（可选接口）
router.get('/questions', (_req, res) => {
  try {
    const questions = {
      trust: {
        environment: [
          '我的团队成员遇到困难时，会主动向我寻求帮助',
          '团队成员在我面前敢于承认错误和失败',
          '我能够控制情绪，不在压力下批评指责团队',
          '我说到做到，团队信任我的承诺',
          '我会在团队面前承认自己的错误和不足'
        ],
        communication: [
          '我能够倾听团队的不同意见，不会立即反驳',
          '我会保护团队成员在客户面前的专业形象',
          '当团队失败时，我关注解决问题而非追究责任',
          '我鼓励团队尝试新方法，即使可能失败',
          '我的办公室对团队成员是开放的'
        ]
      },
      connect: {
        insight: [
          '我了解每个团队成员当前面临的具体销售挑战',
          '我知道每个团队成员的职业发展意愿和目标',
          '我能识别团队成员表面问题背后的深层原因',
          '我了解每个团队成员的能力优势和短板',
          '我知道每个团队成员最担心和顾虑的事情'
        ],
        dialogue: [
          '我会用开放性问题引导团队成员深入思考',
          '我能够耐心倾听，不急于给出建议和指导',
          '我会关注团队成员的情绪和感受变化',
          '我能够通过提问帮助团队成员自己找到答案',
          '我定期与团队成员进行一对一深度交流'
        ]
      },
      enable: {
        support: [
          '我会针对不同团队成员的特点提供不同的指导方式',
          '我有系统的工具和方法来帮助团队提升技能',
          '我能够将复杂的销售技巧分解为可学习的步骤',
          '我会为团队成员提供实战练习和反馈的机会',
          '我能够调动公司资源为团队提供专业支持'
        ],
        effectiveness: [
          '经过我的辅导，团队成员的销售技能有明显提升',
          '我的团队成员能够独立处理复杂的客户问题',
          '我培养出的销售人员在行业内有良好口碑',
          '我的辅导方法被其他销售经理学习和借鉴',
          '我能够快速帮助新人适应销售工作'
        ]
      },
      develop: {
        growth: [
          '我的团队成员具备自我反思和总结的习惯',
          '团队成员遇到新挑战时，会主动寻找解决方法',
          '我的团队内部有互相学习和帮助的氛围',
          '团队成员能够将成功经验转化为可复制的方法',
          '我的团队持续产生新的销售创新和突破'
        ],
        inheritance: [
          '我培养的优秀销售能够指导新同事',
          '我建立了团队经验分享和知识传承机制',
          '我的团队成员具备培训和演讲的能力',
          '我重视长期能力建设而非短期业绩压力',
          '我的管理方法培养出了未来的销售领导者'
        ]
      }
    };

    res.json({
      code: 200,
      message: '获取问题列表成功',
      data: questions
    });

  } catch (error: any) {
    console.error('获取问题列表错误:', error);
    
    res.status(500).json({
      code: 500,
      message: '获取问题列表失败',
      data: null
    });
  }
});

// 健康检查
router.get('/health', (_req, res) => {
  res.json({
    code: 200,
    message: '自我测试服务正常',
    data: {
      service: 'self-test',
      status: 'healthy',
      timestamp: new Date().toISOString()
    }
  });
});

export default router;